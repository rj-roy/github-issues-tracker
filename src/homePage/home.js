const home = () => {
    console.log("home");
    document.getElementById("home").classList.remove("hidden");
}

const fetchAllIssus = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};

fetchAllIssus();


const createElements = (labels) => {
  return labels.map(label => {
    let colorClass = '';
    let iconClass = '';

    switch(label) {
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

const status = (st) =>{
    
}


const displayData = (cards) => {
    cards.forEach(e => {
        const issues = document.getElementById("issues");
       

        const allCards = document.createElement('all-cards');
        allCards.classList.add('pt-1.5', 'rounded-lg', 'grid', 'place-content-end',)
        
        if(e.status === "open"){
            allCards.classList.add('bg-green-500')
        }else{
            allCards.classList.add('bg-[#a855f6]')
        }

        allCards.innerHTML = `
            <card-s class="bg-white rounded-lg shadow p-6 border border-gray-200 h-[100%] mx-auto">
                
                <top-sec class="!flex justify-between items-start mb-4">
                    <div id="status-container" class="w-8 h-8 rounded-full flex items-center justify-center">
                        <span id="status-img" class="text-xl">
                            <img src="./assets/${e.status === "open" ? "open.png" : "closed.png"}" alt="">
                        </span>
                    </div>
                    <span id="priority" class="text-red-500 text-xs font-semibold uppercase bg-red-100 px-2 py-1 rounded-full">${e.priority}</span>
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
    });
}