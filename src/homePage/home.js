const fetchAllIssus = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    manageSpinner(true)
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayAllData(data.data)
            manageSpinner(false)
        });
};
document.addEventListener("DOMContentLoaded", () => {
    fetchAllIssus();
});

// spanLabels
const createElements = (labels) => {
    return labels.map(label => {
        let colorClass = '';
        let iconClass = '';

        switch (label) {
            case 'bug':
                colorClass = 'text-red-500 bg-red-100';
                iconClass = 'fa-solid fa-bug';
                break;
            case 'help wanted':
                colorClass = 'text-yellow-500 bg-yellow-100';
                iconClass = 'fa-solid fa-globe';
                break;
            default:
                colorClass = 'text-gray-500 bg-gray-100';
                iconClass = 'fa-solid fa-tag';
        }

        return `
      <span class="text-xs font-medium ${colorClass} px-2 py-1 rounded-full flex items-center gap-1">
        <i class="${iconClass}"></i> ${label}
      </span>
    `;
    }).join(' ');
}

// spinner
const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById('spinner-loader').classList.remove('hidden');
        document.getElementById('ss').classList.add('hidden');
    } else {
        document.getElementById('spinner-loader').classList.add('hidden');
        document.getElementById('ss').classList.remove('hidden');
    }
}

const modalId = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`

    const response = await fetch(url);
    const details = await response.json();
    modal(details.data);
}

// showModal
const modal = (m) => {   
    console.log(m)
    const myModal = document.getElementById("my_modal_5");
    myModal.showModal();

    myModal.innerHTML = `
    <div class="modal-box max-w-2xl">
    
        <h2 class="text-2xl font-bold mb-3">${m.title}</h2>

        <div class="flex items-center gap-2 text-sm text-base-content/70 mb-4">
            <span class="badge badge-${m.status === "open" ? "success" : "secondary"}">${m.status}</span>
            <span>•</span>
            <span>Opened by ${m.assignee}</span>
            <span>•</span>
            <span>${m.createdAt}</span>
        </div>

        <middle-sec class="!flex gap-2 mb-4 flex-wrap">
            ${createElements(m.labels)}
        </middle-sec>

        <p class="text-base-content/80 mb-6">
            ${m.description}
        </p>

        <div class="card bg-base-200 mb-6">
            <div class="card-body p-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm text-base-content/60 block mb-1">Assignee:</label>
                        <div class="flex items-center gap-2">
                            <span class="font-semibold">${m.assignee}</span>
                        </div>
                    </div>

                    <div>
                        <label class="text-sm text-base-content/60 block mb-1">Priority:</label>
                        <span class="badge badge-${m.priority === "high" ? "error" : m.priority === "low" ? "warning" : "info"} text-white">${m.priority}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-primary">Close</button>
            </form>
        </div>

    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
    `
}

const displayAllData = (cards) => {
    const issues = document.getElementById("issues");
    issues.innerHTML = "";

    const openIssues = cards.filter(card => card.status === "open");
    const closedIssues = cards.filter(card => card.status === "closed");

    // console.log(openIssues)
    // console.log(openIssues.length)
    // console.log(closedIssues)    
    cards.forEach(e => {
        const allBtn = document.getElementById("all-btn");
        const openBtn = document.getElementById("open-btn");
        const closedBtn = document.getElementById("closed-btn");
        const numOfIssues = document.getElementById("num-of-issues");
        numOfIssues.innerText = " ";
        numOfIssues.innerText = e.id;

        const allCards = document.createElement('all-cards');
        allCards.classList.add('pt-1.5', 'rounded-lg', 'grid', 'place-content-end', 'cursor-pointer',)


        if (e.status === "open") {
            allCards.classList.add('bg-green-500')
        } else {
            allCards.classList.add('bg-[#a855f6]')
        }


        allCards.innerHTML = `
            <card-s onclick="modalId(${e.id})" class="bg-white rounded-lg shadow p-6 border border-gray-200 h-[100%] mx-auto">
                
                <top-sec class="!flex justify-between items-start mb-4">
                    <div id="status-container" class="w-8 h-8 rounded-full flex items-center justify-center">
                        <span id="status-img" class="text-xl">
                            <img src="./assets/${e.status === "open" ? "open.png" : "closed.png"}" alt="">
                        </span>
                    </div>
                    <span id="priority" class="text-white text-xs font-semibold uppercase badge badge-${e.priority === "high" ? "error" : e.priority === "low" ? "warning" : "info"} px-2 py-1 rounded-full">${e.priority}</span>
                </top-sec>

                
                <h2 id="title" class="text-gray-900 font-semibold text-lg mb-2">${e.title}</h2>
                
                <p id="description" class="text-gray-500 text-sm mb-4">${e.description}</p>
               
                <middle-sec class="!flex gap-2 mb-4 flex-wrap">
                    ${createElements(e.labels)}
                </middle-sec>
               
                <bottom-sec class="text-gray-400 text-xs">
                    <div>#${e.id} ${e.author}</div>
                    <div>${e.createdAt}</div>
                </bottom-sec>
            </card-s>
        `
        issues.appendChild(allCards);

        openBtn.addEventListener('click', () => {
            numOfIssues.innerText = " ";
            numOfIssues.innerText = openIssues.length;
            allCards.classList.remove("!hidden");

            if (e.status === "closed") {
                allCards.classList.add("!hidden");

            }
        })




        closedBtn.addEventListener('click', () => {
            numOfIssues.innerText = " ";
            numOfIssues.innerText = closedIssues.length;

            allCards.classList.remove("!hidden");

            if (e.status === "open") {
                allCards.classList.add("!hidden");
            }
        })


        allBtn.addEventListener('click', () => {
            allCards.classList.remove("!hidden");
        })
    });
}

