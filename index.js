let myLeads = []
let leadsSession = []
let leadsHistory = []

console.log(
    `Initialize:
    My Leads: ${myLeads}
    History: ${leadsHistory}`
)

const inputEl = document.getElementById("input-el") // Text Input
const inputBtn = document.getElementById("input-btn") // Save Input
const tabBtn = document.getElementById("tab-btn") // Save Tab
const deleteBtn = document.getElementById("delete-btn") // Delete All
const sessionBtn = document.getElementById("session-btn") // Restore
const historyShow = document.getElementById("history-show") // History Show
const historyHide = document.getElementById("history-hide")
historyHide.classList.add("hidden")
let isHistoryDisplayed
const ulEl = document.getElementById("ul-el") // List

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) // Local Storage myLeads
const leadsHistoryFromLocalStorage = JSON.parse(localStorage.getItem("leadsHistory")) // Local Storage Old Leads

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

if (leadsHistoryFromLocalStorage) {
    leadsHistory = leadsHistoryFromLocalStorage
}

console.log(
    `Update:
    My Leads: Storage: ${myLeads}
    History: Storage: ${leadsHistory}`
)

inputEl.addEventListener("keydown", inputEnter)

inputBtn.addEventListener("click", input)

function input() {
    console.log(
        `Input:
        Value: ${inputEl.value}
        My Leads: ${myLeads}
        Session: ${leadsSession}
        History: ${leadsHistory}`
    )

    myLeads.push(inputEl.value)
    leadsHistory.push(inputEl.value)
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
    // localStorage.clear()
    // Push myLeads to leadsSession array for session
    console.log(
        `Delete:
        My Leads: ${myLeads}
        Session: ${leadsSession}
        History: ${leadsHistory}`
    )

    if (myLeads.length || isHistoryDisplayed) {
        hideHistory()
        leadsSession.push(...myLeads) // Session Leads
        myLeads = []
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
    }
    render(myLeads)

    console.log(
        `Delete:
        My Leads: ${myLeads}
        Session: ${leadsSession}
        History: ${leadsHistory}`
    )
})

// const clrBtn = document.getElementsByClassName("clr-btn") // Clear Single Entry
// clrBtn.addEventListener("click", function(){
//     console.log("Clear Entry Button")
// })

sessionBtn.addEventListener("dblclick", restoreSession)
historyShow.addEventListener("dblclick", showHistory)
historyHide.addEventListener("dblclick", hideHistory)

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
        console.log(
            `Restore:
            My Leads: ${myLeads}
            Session: ${leadsSession}`
        )

        myLeads.push(...leadsSession)
        leadsSession = []
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        
        console.log(
            `Restore:
            My Leads: ${myLeads}
            Session: ${leadsSession}`
        )
    }
}

function showHistory() {
    if (leadsHistory.length) {
        console.log(
            `History:
            My Leads: ${myLeads}
            Session: ${leadsSession}
            History: ${leadsHistory}`
        )

        historyShow.classList.add("hidden")
        historyHide.classList.remove("hidden")

        // myLeads.push(...leadsHistory)
        isHistoryDisplayed = true
        console.log(isHistoryDisplayed)
        render(leadsHistory)
    
        console.log(
            `History:
            My Leads: ${myLeads}
            Session: ${leadsSession}
            History: ${leadsHistory}`
        )
    }
}

function hideHistory() {
    if (isHistoryDisplayed) {
        isHistoryDisplayed = false
        historyHide.classList.add("hidden")
        historyShow.classList.remove("hidden")
        render(myLeads)
    }
}
