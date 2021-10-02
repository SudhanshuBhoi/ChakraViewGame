const mantri_red_ele = `
    <div class="team-a-pawn">
        <div class="team-a-minister"></div>
    </div>
`
const mantri_blue_ele = `
    <div class="team-b-pawn">
        <div class="team-b-minister"></div>
    </div>
`
const soldier_red_ele = `
    <div class="team-a-pawn">
    </div>
`
const soldier_blue_ele = `
    <div class="team-b-pawn">
    </div>
`

var elements = document.getElementsByClassName("unit");
var select_a = null
var select_b = null

function init() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].id = String(Math.floor(i / 7)) + String(i % 7);
        elements[i].setAttribute('onclick', 'select_unit(this.id)') 
    }

    // initialise the board
    for (let i = 0, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = mantri_red_ele
    }
    for (let i = 1, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = soldier_red_ele
    }
    for (let i = 2, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = soldier_red_ele
    }
    for (let i = 4, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = soldier_blue_ele
    }
    for (let i = 5, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = soldier_blue_ele
    }
    for (let i = 6, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = mantri_blue_ele
    }

}

function select_unit(id) {
    if (select_a == null) {
        select_a = id
    } else if (select_b == null) {
        select_b = id
        if (!move_unit(select_a, select_b)) {
            select_a = null
            select_b = null
        }
    }
}

function move_unit(from_id, to_id) {
    let from_idx = convert_id_to_idx(from_id)
    let to_idx = convert_id_to_idx(to_id)
    if (elements[from_idx].getElementsByClassName('team-a-minister').length !== 0) {
        elements[from_idx].getElementsByClassName('dot')[0].innerHTML = ""
        elements[to_idx].getElementsByClassName('dot')[0].innerHTML = mantri_red_ele
        // reset selections
        select_a = null
        select_b = null
        return true
    }
    return false
}


// HELPER FUNCITONS

function convert_id_to_idx(id) {
    return Number(id[0]) * 7 + Number(id[1])
}