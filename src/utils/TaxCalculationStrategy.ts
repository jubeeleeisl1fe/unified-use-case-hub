
export interface TaxCalculationStrategy {
  calculateTax(salary: number): number;
}

export class BasicTaxStrategy implements TaxCalculationStrategy {
  calculateTax(salary: number): number {
    if (salary <= 50000) {
      return salary * 0.1; // 10% tax for low income
    } else if (salary <= 100000) {
      return salary * 0.2; // 20% tax for middle income
    } else {
      return salary * 0.3; // 30% tax for high income
    }
  }
}

export class ProgressiveTaxStrategy implements TaxCalculationStrategy {
  calculateTax(salary: number): number {
    // More complex progressive tax calculation
    if (salary <= 50000) {
      return salary * 0.05; // 5% tax
    } else if (salary <= 100000) {
      return 2500 + (salary - 50000) * 0.15; // Base + incremental rate
    } else {
      return 12500 + (salary - 100000) * 0.25; // More complex calculation
    }
  }
}

// Tax strategy context
export class TaxCalculator {
  private strategy: TaxCalculationStrategy;

  constructor(strategy: TaxCalculationStrategy = new BasicTaxStrategy()) {
    this.strategy = strategy;
  }

  setStrategy(strategy: TaxCalculationStrategy) {
    this.strategy = strategy;
  }

  calculateTax(salary: number): number {
    return this.strategy.calculateTax(salary);
  }
}
