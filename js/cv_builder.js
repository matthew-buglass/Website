function get_cv_html() {
    var section_elem = document.createElement('html');
    section_elem.innerHTML = '<div class="dummy"><div class="cv-section-content-wrapper"><h2 class="title"></h2><h3 class="location"></h3><h3 class="dates"></h3><p class="details"></p></div></div>';
    return section_elem.getElementsByClassName("dummy")[0];
}

function get_work_data() {
    return new Promise((resolve, reject) => {
        /* Get a the section element */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) { resolve(JSON.parse(this.responseText)) }
                if (this.status == 404) { reject("Data not found") }
            }
        }
        xhttp.open("GET", "/data/work.json", true);
        xhttp.send();
    })
}

async function buildCV() {
    /* Get a the section element */
    var section_elem = get_cv_html();

    /* Build work data */
    get_work_data().then(
        function(resp) {
            let work_section = document.getElementById("work");
            console.log(work_section);
            resp.forEach(elem => {
                let new_sec = section_elem.cloneNode(deep=true);
                new_sec.getElementsByClassName('title')[0].innerHTML = elem.title
                new_sec.getElementsByClassName('location')[0].innerHTML = elem.location;
                new_sec.getElementsByClassName('dates')[0].innerHTML = elem.dates;
                new_sec.getElementsByClassName('details')[0].innerHTML = elem.details;
                console.log(new_sec)
                work_section.innerHTML += new_sec.innerHTML;
                
            });
            console.log(work_section);
        },
        function(err) {
            let work_section = document.getElementById("work");
            work_section.innerHTML = err;
        }
    );
}