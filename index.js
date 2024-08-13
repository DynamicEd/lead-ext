let myLeads = []
let leadsSession = []
let leadsHistory = []

// Text Input Field
const inputEl = document.getElementById("input-el")
// Save Input Button
const inputBtn = document.getElementById("input-btn")
// Save Current Tab
const tabBtn = document.getElementById("tab-btn")
// Clear List Button
const deleteBtn = document.getElementById("delete-btn")
// Restore Session Button
const sessionBtn = document.getElementById("session-btn")
sessionBtn.classList.add("hidden")
let isRestoreDisplayed = false
// Clear History Button
const historyClear = document.getElementById("history-clear")
historyClear.classList.add("hidden")
// Show History Button
const historyShow = document.getElementById("history-show")
// Hide History Button
const historyHide = document.getElementById("history-hide")
historyHide.classList.add("hidden")
let isHistoryDisplayed = false
// List Items
const ulEl = document.getElementById("ul-el")
// Local Storage myLeads
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
// Local Storage Leads History
const leadsHistoryFromLocalStorage = JSON.parse(localStorage.getItem("leadsHistory"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

if (leadsHistoryFromLocalStorage) {
    leadsHistory = leadsHistoryFromLocalStorage
}

inputEl.addEventListener("keydown", inputEnter)
inputBtn.addEventListener("click", input)
sessionBtn.addEventListener("dblclick", restoreSession)
historyClear.addEventListener("dblclick", clearHistory)
historyShow.addEventListener("dblclick", showHistory)
historyHide.addEventListener("dblclick", hideHistory)

function input() {
    hideHistory()
    deleteBtn.classList.remove("hidden")
    myLeads.push(inputEl.value)
    
    if (leadsHistory.length) {
        leadsHistory.push(inputEl.value)
    } else {
        leadsHistory.push(...myLeads)
    }

    inputEl.placeholder = ""
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    localStorage.setItem("leadsHistory", JSON.stringify(leadsHistory))
    render(myLeads)
}

function inputEnter(key) {
    if (key.keyCode === 13) {
        input()
    }
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    // Push myLeads to leadsSession array for session
    if (myLeads.length || isHistoryDisplayed) {
        hideHistory()
        deleteBtn.classList.add("hidden")
        sessionBtn.classList.remove("hidden")
        leadsSession.push(...myLeads) // Session Leads
        myLeads = []
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
    }
    render(myLeads)
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

function restoreSession() {
    if (leadsSession.length) {
        hideHistory()
        sessionBtn.classList.add("hidden")
        deleteBtn.classList.remove("hidden")

        myLeads.push(...leadsSession)
        leadsSession = []
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
}

function showHistory() {
    if (leadsHistory.length) {
        sessionBtn.classList.add("hidden")
        deleteBtn.classList.add("hidden")
        historyClear.classList.remove("hidden")
        historyShow.classList.add("hidden")
        historyHide.classList.remove("hidden")

        isHistoryDisplayed = true
        render(leadsHistory)
    } else {
        inputEl.placeholder = "Add New Lead to Save History"
        historyShow.textContent = "NO HISTORY"
        setTimeout(() => {
            historyShow.textContent = "SHOW HISTORY"
        }, 2500);
    }
}

function hideHistory() {
    if (isHistoryDisplayed) {
        isHistoryDisplayed = false
        historyClear.classList.add("hidden")
        historyHide.classList.add("hidden")
        historyShow.classList.remove("hidden")
        if (leadsSession.length) {
            sessionBtn.classList.remove("hidden")
        } else {
            deleteBtn.classList.remove("hidden")
        }
        if (myLeads.length) {
            deleteBtn.classList.remove("hidden")
        }
        render(myLeads)
    }
}

function clearHistory() {
    if (leadsHistory.length) {
        historyClear.classList.add("hidden")
        historyHide.classList.add("hidden")
        historyShow.classList.remove("hidden")
        if (leadsSession.length) {
            sessionBtn.classList.remove("hidden")
        } else {
            deleteBtn.classList.remove("hidden")
        }

        leadsHistory = []
        localStorage.setItem("leadsHistory", JSON.stringify(leadsHistory))
        render(myLeads)
    }
}