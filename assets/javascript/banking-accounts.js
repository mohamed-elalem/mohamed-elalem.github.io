const account_class = () => {
  let account_name = '';
  let balance = 0;

  return {
    get_acccount_name: () => account_name,
    get_balance: () => balance,
    new: function(name, dep) {
      account_name = name;
      balance = dep;

      return this;
    },
    to_string: () => `Account name: ${account_name} Balance: ${balance}`
  }
};

const account_info_list = [];

window.onload = () => {
  document.getElementsByTagName('button')[0].onclick = () => {
    let account_name = document.getElementById('account-name');
    let deposit = document.getElementById('account-deposit');
    let accounts = document.getElementById('accounts');
    account = account_class().new(account_name.value, deposit.value);

    account_info_list.push(account);
    accounts.value = account_info_list.map(account => account.to_string()).join('\n');
  }
};