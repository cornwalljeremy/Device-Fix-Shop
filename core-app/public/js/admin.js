const deviceList = document.querySelector('.device-list');
const deviceForm = document.querySelector('.device-form');

const createRow = (device) => {
  const deviceEl = document.createElement('tr');
  deviceEl.setAttribute('data-id', device.id);
  deviceEl.innerHTML = `
    <td>${device.model}</td>
    <td>${device.platform}</td>
    <td>${device.screen_size}"</td>
    <td>${formatDate(device.date_received)}</td>
    <td>${device.cond}</td>
    <td>${device.notes || ''}</td>
    <td>
      <button class="btn btn-danger" data-type="remove" data-id="${
        device.id
      }">X</button>
    </td>
  `;

  return deviceEl;
};

// connect to inventory service
const socket = new WebSocket(`ws://${location.host}`);

socket.addEventListener('message', (res) => {
  const { type, payload } = JSON.parse(res.data);

  switch (type) {
    case 'all-models':
      const modelSelect = deviceForm.querySelector('[name="model_id"]');

      for (model of payload) {
        const modelOption = document.createElement('option');
        modelOption.value = model.id;
        modelOption.textContent = model.name;

        modelSelect.appendChild(modelOption);
      }

      break;
    case 'all-devices':
      for (device of payload) {
        const newDeviceRow = createRow(device);

        deviceList.appendChild(newDeviceRow);
      }

      break;
    case 'add-device':
      const newDeviceRow = createRow(payload);
      deviceList.prepend(newDeviceRow);
      break;
    case 'remove-device':
      const deviceRow = document.querySelector(`tr[data-id="${payload.id}"]`);
      deviceList.removeChild(deviceRow);
      break;
    case 'update-device':
      const deviceNotes = document.querySelector(
        `textarea[data-id="${payload.id}"]`
      );
      deviceNotes.value = payload.notes;
      break;
  }
});

deviceList.addEventListener('click', (event) => {
  if (event.target.getAttribute('data-type') === 'remove') {
    socket.send(
      JSON.stringify({
        type: 'remove-device',
        payload: { id: event.target.getAttribute('data-id') },
      })
    );
  }
});

deviceList.addEventListener('change', (event) => {
  if (event.target.getAttribute('data-type') === 'update') {
    socket.send(
      JSON.stringify({
        type: 'update-device',
        payload: {
          id: event.target.getAttribute('data-id'),
          notes: event.target.value,
        },
      })
    );
  }
});

deviceForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(deviceForm);

  socket.send(
    JSON.stringify({
      type: 'add-device',
      payload: {
        model_id: formData.get('model_id'),
        cond: formData.get('cond'),
        notes: formData.get('notes'),
      },
    })
  );

  deviceForm.reset();
});
