let records;
(function() {
  function saveCurrentUser(name, sex) {
    let currentUser = {
      name: name,
      sex: sex
    }
    serialCurrentUser = JSON.stringify(currentUser);
    localStorage.setItem('currentUser', serialCurrentUser);
  }

  function addRecord(defMonsters) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let recordsObj = JSON.parse(localStorage.getItem('Records'));
    let count = 0;
    for (key in recordsObj) {
      count += recordsObj[key].length;
    }

    if (count === 12) {
      let keys = Object.keys(recordsObj);
      keys = keys.map((item) => Number(item));
      keys.push(defMonsters);
      keys.sort((a,b) => a > b);
      if (defMonsters === keys[0]) {
        return;
      }
      deleteRecord(keys[0], recordsObj);
    }

    if(defMonsters in recordsObj) {
      recordsObj[defMonsters].push(currentUser.name);
    } else {
      recordsObj[defMonsters] = [currentUser.name];
    }
    localStorage.setItem('Records', JSON.stringify(recordsObj));
  }

  function deleteRecord(key, recordsObj) {
    if (recordsObj[key].length === 1) {
      delete recordsObj[key];
    } else {
      recordsObj[key].pop();
    }
  }

  function showRecords(table) {
    let tbody = document.querySelector('tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    let recordsObj = JSON.parse(localStorage.getItem('Records'));
    let keys = Object.keys(recordsObj);
    keys.sort((a,b) => a > b);

    for (let i = keys.length - 1 ; i >= 0; i--) {
      show(table, keys[i], recordsObj[keys[i]]);
    }
  }

  function show(table, defMonsters, names) {
    names.forEach(name => {
      createRow(table, name, defMonsters);
    });
  }

  function createRow(table, name, defMonsters) {
    const row = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.innerText = name;
    td2.innerText = defMonsters;
    row.appendChild(td1);
    row.appendChild(td2);
    table.querySelector('tbody').appendChild(row);
  }

  records = { 
    saveCurrentUser: saveCurrentUser,
    add: addRecord,
    render: showRecords
  };
})();