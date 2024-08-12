let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const restoreBtn = document.getElementById("restore-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    console.log("myLeads:")
    console.log(myLeads)
    render(myLeads)
}

// Refector the function so that it takes a parameter, leads, that it uses
// instead of the global myLeads variable. Remember to update all invocations 
// of the function as well.

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

restoreBtn.addEventListener("dblclick", restore)
function restore() {
    if (oldLeads.length) {
        console.log("Truthy")
        console.log("Restore:")
        console.log("oldLeads:")
        console.log(oldLeads)
        console.log("myLeads:")
        console.log(myLeads)
        myLeads.push(...oldLeads)
        oldLeads = []
        console.log("oldLeads:")
        console.log(oldLeads)
        console.log("myLeads:")
        console.log(myLeads)
    } else {
        console.log("Falsy")
    }
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
}

deleteBtn.addEventListener("dblclick", function() {
    console.log("Delete:")
    localStorage.clear()
    oldLeads.push(...myLeads)
    console.log("oldLeads:")
    console.log(oldLeads)
    myLeads = []
    console.log("myLeads:")
    console.log(myLeads)
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})