//第一阶段，提取出外部数据
//创建单独的类表示这些外部数据
function Person(data){
	this.ssId = data.ssId || '';
	this.name = data.name || '';
}

function Company(data){
	this.name = data.name || '';
	this.address = data.address || '';
	this.country = data.country || '';
}

//第二阶段，确保代表唯一外部状态的对象只被创建一次并被保存起来以后供后续使用
var personFactory = (function(){
	var people = {},
		personCount = 0;

	return {
		createPerson: function(data){
			var person = people[data.ssId],
				newPerson;

			if(person){
				return person;
			}else{
				newPerson = new Person(data);
				people[newPerson.ssId] = newPerson;
				personCount++;

				return newPerson;
			}
		},
		getPersonCount: function(){
			return personCount;
		}
	};

}());

var companyFactory = (function(){
	var companies = {},
		companyCount = 0;

	return {
		createCompay: function(data){
			var company = companies[data.name],
				newCompany;

			if(company){
				return company;
			}else{
				newCompany = new Company(data);
				companies[newCompany.name] = newCompany;
				companyCount++;

				return newCompany;
			}
		},
		getCompanyCount: function(){
			return companyCount;
		}
	};

}());


//第三阶段，创建所需要的单例
employee = (function(){

	var employees = {},
		employeeCount = 0;

	return {
		add: function(data){
			var person = personFactory.createPerson({
					ssId: data.ssId,
					name: data.name
				}),
				company = companyFactory.createCompay({
					name: data.companyName,
					address: data.companyAddress,
					country: data.companyCountry
				});

			employees[data.employeeId] = {
				employeeId: data.employeeId,
				occupation: data.occupation,
				person: person,
				company: company
			};

			employeeCount++;
		}
	}
}());