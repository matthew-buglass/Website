function get_cv_html() {
    var section_elem = document.createElement('html');
    section_elem.innerHTML = '<div class="dummy"><div class="cv-section-content-wrapper"><h2 class="title"></h2><h3 class="location"></h3><h3 class="dates"></h3><p class="details"></p></div></div>';
    return section_elem.getElementsByClassName("dummy")[0];
}

function get_json_data(path) {
    return new Promise((resolve, reject) => {
        /* Get a the section element */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) { resolve(JSON.parse(this.responseText)) }
                if (this.status == 404) { reject("Data not found") }
            }
        }
        xhttp.open("GET", path, true);
        xhttp.send();
    })
}

function append_elements(super_elem, sub_elem_template, sub_elem_data) {
    sub_elem_data.forEach(elem => {
        let new_sec = sub_elem_template.cloneNode(deep=true);
        new_sec.getElementsByClassName('title')[0].innerHTML = elem.title
        new_sec.getElementsByClassName('location')[0].innerHTML = elem.location;
        new_sec.getElementsByClassName('dates')[0].innerHTML = elem.dates;
        new_sec.getElementsByClassName('details')[0].innerHTML = elem.details;
        super_elem.innerHTML += new_sec.innerHTML;
    });
}

async function buildCV() {
    /* Get a the section element */
    var section_elem = get_cv_html();

    /* Build work data */
    get_json_data("/data/work.json").then(
        function(resp) {
            let work_section = document.getElementById("work");
            append_elements(work_section, section_elem, resp);
        },
        function(err) {
            let work_section = document.getElementById("work");
            work_section.innerHTML = err;
        }
    );

    /* Build volunteer data */
    get_json_data("/data/volunteer.json").then(
        function(resp) {
            let work_section = document.getElementById("volunteer");
            append_elements(work_section, section_elem, resp);
        },
        function(err) {
            let work_section = document.getElementById("volunteer");
            work_section.innerHTML = err;
        }
    );

    /* Build academic data */
    get_json_data("/data/academic.json").then(
        function(resp) {
            let work_section = document.getElementById("academic");
            append_elements(work_section, section_elem, resp);
        },
        function(err) {
            let work_section = document.getElementById("academic");
            work_section.innerHTML = err;
        }
    );

    /* Build awards data */
    get_json_data("/data/awards.json").then(
        function(resp) {
            let work_section = document.getElementById("awards");
            append_elements(work_section, section_elem, resp);
        },
        function(err) {
            let work_section = document.getElementById("awards");
            work_section.innerHTML = err;
        }
    );
}