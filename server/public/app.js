(function(gobal) {
  let button = document.getElementById('button');
  let textArea = document.getElementById('json');

  button.addEventListener('click', (e) => {
    axios
      .post('/submit', { json: textArea.value })
      .then((res) => {
        console.log('TCL: res', res);
      })
      .catch((e) => {
        console.log('TCL: e', e);
      });

    textArea.value = '';
  });

  axios
    .get('/readFiles')
    .then(({ data }) => {
      console.log('TCL: data', data);
    })
    .catch((err) => {
      console.log('TCL: err', err);
    });
})(window);
