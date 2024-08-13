let myLeads = []
let oldLeads = []
let oldLeadsAll = []
const inputEl = document.getElementById("input-el") // Text Input
const inputBtn = document.getElementById("input-btn") // Save Input
const tabBtn = document.getElementById("tab-btn") // Save Tab
const deleteBtn = document.getElementById("delete-btn") // Delete All
const restoreBtn = document.getElementById("restore-btn") // Restore
const ulEl = document.getElementById("ul-el") // List

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) // Local Storage myLeads
const oldLeadsFromLocalStorage = JSON.parse(localStorage.getItem("oldLeadsAll")) // Local Storage Old Leads

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// if (oldLeadsFromLocalStorage) {
//     oldLeadsAll = oldLeadsFromLocalStorage
// }

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function() {
    // localStorage.clear()
    // Push myLeads to oldLeads array for session
    if (myLeads.length) {
        oldLeads.push(...myLeads) // Session Leads
        // Adds to oldLeadsAll array in LocalStorage
        // localStorage.setItem("oldLeadsAll", JSON.stringify(oldLeadsAll)) // All Old Leads
        myLeads = []
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
})

// const clrBtn = document.getElementsByClassName("clr-btn") // Clear Single Entry
// clrBtn.addEventListener("click", function(){
//     console.log("Clear Entry Button")
// })

restoreBtn.addEventListener("click", restore)
restoreBtn.addEventListener("dblclick", restoreAll)

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <a class="clr-btn">x</a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

function restore() {
    if (oldLeads.length) {
        myLeads.push(...oldLeads)
        oldLeads = []
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    }
}

function restoreAll() {
        // oldLeads = JSON.parse(localStorage.getItem("oldLeads"))

}
