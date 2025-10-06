let money = 1000;
let cash = 1000;
let curr_count = 0;

window.addEventListener('DOMContentLoaded', () => {
  const dom_account = document.getElementById('money');
  const dom_cash = document.getElementById('cash');
  dom_account.value = money;
  dom_cash.value = cash;
});

function Change() {
  const Current_account = document.querySelector('input[name="Current-account"]').value;
  const Current_balance = document.querySelector('input[name="Current-balance"]').value;

  const newAccount = Number(Current_account);
  const newCash = Number(Current_balance);

  if (Number.isNaN(newAccount) || Number.isNaN(newCash)) return;

  money = newAccount;
  cash = newCash;

  document.getElementById('money').value = money;
  document.getElementById('cash').value = cash;

  curr_count += 1;
  logarithm('success');
}

function logarithm(action) {
  const dom_log = document.getElementById('log_area');
  if (action === 'error_withdraw') {
    dom_log.value += `${curr_count}, Couldn't withdraw entered balance. (Insufficient account balance)\n`;
  } else if (action === 'error_deposite') {
    dom_log.value += `${curr_count}, Couldn't deposite entered balance. (Insufficient cash to deposit)\n`;
  } else {
    dom_log.value += `${curr_count}, Current account balance: ${money}, Current cash balance: ${cash}\n`;
  }
  dom_log.scrollTop = dom_log.scrollHeight;
}

function Proceed() {
  const selectMode = document.getElementById('selecter');
  const Mode = (selectMode.value || '').toLowerCase();

  const balanceStr = document.querySelector('input[name="oper_balance"]').value;
  const amount = Number(balanceStr);

  if (!amount || amount <= 0 || Number.isNaN(amount)) return;

  const dom_account = document.getElementById('money');
  const dom_cash = document.getElementById('cash');

  curr_count += 1;

  if (Mode === 'deposit') {
    if (amount <= cash) {
      money = Number(money) + amount;
      cash = Number(cash) - amount;
      dom_account.value = money;
      dom_cash.value = cash;
      logarithm('success');
    } else {
      logarithm('error_deposite');
    }
  } else if (Mode === 'withdraw') {
    if (amount <= money) {
      money = Number(money) - amount;
      cash = Number(cash) + amount;
      dom_account.value = money;
      dom_cash.value = cash;
      logarithm('success');
    } else {
      logarithm('error_withdraw');
    }
  }
}
