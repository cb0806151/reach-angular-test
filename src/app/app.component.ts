import { Component } from '@angular/core';
import {loadStdlib} from '@reach-sh/stdlib';
const reach = loadStdlib('ALGO');

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button (click)="connectWallet()">connect wallet</button>
      <div>
        <input [(ngModel)]="fundAmount"/>
        <button (click)="fundWallet()">fund wallet</button>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  account: any;
  balance: any;
  fundAmount: number = 0;
  async connectWallet() {
    await this.getAccount();
    await this.getBalance();
  }
  async getAccount() {
    this.account = await reach.getDefaultAccount();
    console.log(this.account);
  }
  async getBalance() {
    let rawBalance = await reach.balanceOf(this.account)
    this.balance = reach.formatCurrency(rawBalance, 4);
    console.log(this.balance);
  }
  async fundWallet() {
    await reach.fundFromFaucet(this.account, reach.parseCurrency(this.fundAmount));
    await this.getBalance();
  }
}
