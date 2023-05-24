const Employee = require("./employee");

class Manager extends Employee {
    constructor(name, salary, title, manager, employees = []) {
       super(name, salary, title, manager);
       this.employees = employees;
    }

    addEmployee(employee) {
        this.employees.push(employee);
    }

    calculateBonus(multiplier) {
        let managerPlusEmployee = this.salary + this._totalSubSalary(this);
        return managerPlusEmployee * multiplier;
    }

    _totalSubSalary(employee) {
        let sum = 0;
        for (let i = 0; i < this.employees.length; i++) {
            if (employee.employees[i] instanceof Manager) {
                sum+= employee.employees[i].salary;
                sum+= this._totalSubSalary(employee.employees[i]);
            } else {
                sum += employee.employees[i].salary;
            }
        }
        return sum;
    }
}

const splinter = new Manager('Splinter', 100000, 'Sensei');
const leo = new Manager('Leonardo', 90000, 'Ninja', splinter);
const raph = new Manager('Raphael', 90000, 'Ninja', leo);
const mikey = new Employee('Michelangelo', 85000, 'Grasshopper', raph);
const donnie = new Employee('Donatello', 85000, 'Grasshopper', raph);

console.log(splinter.calculateBonus(0.05)); // => 22500
console.log(leo.calculateBonus(0.05)); // => 17500
console.log(raph.calculateBonus(0.05)); // => 13000


module.exports = Manager;
