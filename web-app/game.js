const mantri_a_ele = `
    <div class="team-a-pawn">
        <div class="team-a-minister"></div>
    </div>
`
const mantri_b_ele = `
    <div class="team-b-pawn">
        <div class="team-b-minister"></div>
    </div>
`
const soldier_a_ele = `
    <div class="team-a-pawn">
    </div>
`
const soldier_b_ele = `
    <div class="team-b-pawn">
    </div>
`

const mantri_a_name = "team-a-minister"
const mantri_b_name = "team-b-minister"
const soldier_a_name = "team-a-pawn"
const soldier_b_name = "team-b-pawn"
const empty = "empty"

const pawn_list = [mantri_a_name, mantri_b_name, soldier_a_name, soldier_b_name]
const pawn_ele_map = {}
pawn_ele_map[mantri_a_name] = mantri_a_ele,
pawn_ele_map[mantri_b_name] = mantri_b_ele,
pawn_ele_map[soldier_a_name] = soldier_a_ele,
pawn_ele_map[soldier_b_name] = soldier_b_ele

const alert_invalid_move = "Invalid Move! Try again..."

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
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = mantri_a_ele
    }
    for (let i = 1, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = soldier_a_ele
    }
    for (let i = 2, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = soldier_a_ele
    }
    for (let i = 4, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = soldier_b_ele
    }
    for (let i = 5, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = soldier_b_ele
    }
    for (let i = 6, j = 0; j < 7; j++) {
        elements[i*7+j].getElementsByClassName('dot')[0].innerHTML = mantri_b_ele
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
    let from_pawn = which_pawn_at(from_idx)
    let to_pawn = which_pawn_at(to_idx)
    if (is_valid_move(from_pawn, to_pawn)) {
        elements[from_idx].getElementsByClassName('dot')[0].innerHTML = ""
        elements[to_idx].getElementsByClassName('dot')[0].innerHTML = pawn_ele_map[from_pawn]
        // reset selections
        select_a = null
        select_b = null
        return true
    }
    return false
}

// GAME FUNCTIONS

function is_valid_move(from_spot, to_spot) {
    if (from_spot !== empty && to_spot === empty) {
        return true
    }
    alert(alert_invalid_move)
    return false
}


// HELPER FUNCITONS

function convert_id_to_idx(id) {
    return Number(id[0]) * 7 + Number(id[1])
}

function which_pawn_at(idx) {
    for (let pawn_name of pawn_list) {
        if (elements[idx].getElementsByClassName(pawn_name).length !== 0) {
            return pawn_name
        }
    }
    return empty
}