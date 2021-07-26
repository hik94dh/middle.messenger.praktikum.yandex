import { expect } from 'chai';
import { validation } from './validationReg';

describe('Valid', function () {
	it('check name', function () {
		const correctValue = 'name';
		const inCorrectValue = 'name123';

		expect(validation.first_name.test(correctValue)).to.be.true;
		expect(validation.first_name.test(inCorrectValue)).to.be.false;
	});
	it('check email', function () {
		const correctValue = 'test@mail.ru';
		const inCorrectValue = 'test';

		expect(validation.email.test(correctValue)).to.be.true;
		expect(validation.email.test(inCorrectValue)).to.be.false;
	});
	it('check login', function () {
		const correctValue = 'Login123';
		const inCorrectValue = 'Login123@';

		expect(validation.login.test(correctValue)).to.be.true;
		expect(validation.login.test(inCorrectValue)).to.be.false;
	});
	it('check phone', function () {
		const correctValue = '8(123)4567890';
		const inCorrectValue = '+7 (123) text';

		expect(validation.phone.test(correctValue)).to.be.true;
		expect(validation.phone.test(inCorrectValue)).to.be.false;
	});
	it('check password', function () {
		const correctValue = 'Test1234!$';
		const inCorrectValue = 'test1234!$';

		expect(validation.password.test(correctValue)).to.be.true;
		expect(validation.password.test(inCorrectValue)).to.be.false;
	});
});
