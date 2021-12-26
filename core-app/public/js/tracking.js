const trackingID = location.href.split('/').pop();
const historyTable = document.querySelector('.shipping-history');

const getData = async (trackingID) => {
  const response = await fetch(`/api/shipments/${trackingID}`);
  
  if (response.status === 200) {
    // if successful, show details
    document
      .querySelector('.row.display-none')
      .classList.remove('display-none');
    
    const {address, updates, expected_arrival } = await response.json();
  
    // insert address
    document.querySelector('.address').innerHTML = `
      ${address.street}
      <br/>
      ${address.city}, ${address.state}, ${address.postal_code}
    `;
  
    // insert expected delivery date
    document.querySelector('.expected-date').textContent = formatDate(expected_arrival);
    
    // create table row for each update
    for (info of updates) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="p-1">${info.status}</td>
        <td class="p-1">${info.location}</td>
        <td class="p-1">${formatDate(info.updated_on)}</td>
      `;
  
      historyTable.appendChild(row);
    }
  }
};

document.querySelector('.tracking-number').textContent = trackingID;

getData(trackingID);
