import { Component } from '@angular/core';
import * as reach from '@reach-sh/stdlib/ALGO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reachAngularTest';
  account: any;
  balance: any;

  async connectWallet() {
    await this.getAccount();
    await this.getBalance();
  }

  async getAccount() {
    this.account = await reach.getDefaultAccount("testWallet");
    console.log(this.account);
  }

  async getBalance() {
    this.balance = reach.formatCurrency(await reach.balanceOf(this.account), 4);
    console.log(this.balance);
  }
}
