class BalanceSingleton {
  private static instance: BalanceSingleton;
  public expense: number = 0;
  public revenue: number = 0;
  public balance: number = 0;

  private constructor() {}

  public static getInstance(): BalanceSingleton {
    if (!BalanceSingleton.instance) {
      BalanceSingleton.instance = new BalanceSingleton();
    }

    return BalanceSingleton.instance;
  }

  getExpense(): number {
    return this.expense;
  }

  getRevenue(): number {
    return this.revenue;
  }

  public setExpense(expense: number): void {
    this.expense += expense;
  }

  public setRevenue(revenue: number): void {
    this.revenue += revenue;
  }

  public setBalance(balance: number) {
    this.balance += balance;
  }
}

const singletonBalance = BalanceSingleton.getInstance();

export default singletonBalance;
