/**

Crea un programa que un cajero automático pueda utilizar para determinar el número mínimo de tickets a
entregar 
dado un monto solicitado. El cajero empieza con:

* 100 billetes de 100
* 50 billetes de 50
* 200 billetes de 20
* 300 billetes de 10
* 500 billetes de 5
* 800 billetes de 1

*/

function getCash(atm, money) {
  var cash = [],
    centinel = false,
    currentMoney = money;

  for (var i = 0; i < atm.length && !centinel; i++) {
    var div = 0;
    var papers = 0;

    if (money > 0) {
      div = parseInt(money / atm[i].amount);

      if (div > atm[i].quantity) {
        papers = atm[i].quantity;
        atm[i].quantity -= papers;
      } else {
        papers = div;
        atm[i].quantity -= div;
      }

      cash.push({ amount: atm[i].amount, quantity: papers });
      money -= (atm[i].amount * papers);
    } else {
      centinel = true;
    }
  }
  return cash;
};

function returnCash(atm, money, arrCash) {
  var sum = 0,
  centinel = false;

  for(var i = 0; i < arrCash.length; i++){
    sum += arrCash[i].amount * arrCash[i].quantity;
  }

  if(sum !== money) {
    centinel = true;
    for(var i = 0; i < arrCash.length; i++) {
      for(var j = 0; j < atm.length; j++) {
        if(arrCash[i].amount === atm[j].amount) {
          atm[j].quantity += arrCash[i].quantity;
        }
      }
    }
  }

  return centinel;
}

function printCash(arrCash, money) {
  var str = '';

  if (0 === arrCash.length) {
    str += 'No disponemos de efectivo para su monto solicitado.';
  } else {
    var tickets = 0;

    for (var i = 0; i < arrCash.length; i++) { tickets += arrCash[i].quantity }

    str = 'Monto solicitado ' + money + ' dólares, se entregan ' + tickets + ' billetes:\n';

    for (var i = 0; i < arrCash.length; i++)
      str += arrCash[i].amount + ': ' + arrCash[i].quantity + '\n';
  }
  return str;
};

function printATM(atm) {
  var str = 'En el cajero quedan: \n';

  for (var i = 0; i < atm.length; i++)
    str += atm[i].amount + ': ' + atm[i].quantity + '\n';

  return str;
};

function print(atm, cash, money) {
  str = '';

  str += printCash(cash, money) + '\n';
  str += printATM(atm);

  return str;
};

var atm = [{ amount: 100, quantity: 100 }, { amount: 50, quantity: 50 }, { amount: 20, quantity: 200 },
{ amount: 10, quantity: 300 }, { amount: 5, quantity: 500 }, { amount: 1, quantity: 800 }];

do {
  var op = 0;
  var strMenu = '1. Retirar dinero\n2. Apagar\n';

  op = parseInt(prompt(strMenu));

  if (op === 1) {
    money = parseInt(prompt('Monto a retirar: '));
    arrCash = getCash(atm, money);

    if(returnCash(atm, money, arrCash)) {
      arrCash = [];
    }

    console.log(print(atm, arrCash, money));
  }
} while (op !== 2);