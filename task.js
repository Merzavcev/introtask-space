/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
	this.name = name;
	this.position = position;
	this.capacity = capacity;
	this.occupiedSpace = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
	console.log("Корабль \"" + this.name + "\". Местоположение: " + this.position + ". " + this.getOccupiedSpace());
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
	return this.capacity - this.occupiedSpace;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
	if (this.occupiedSpace) {
		return "Занято: " + this.occupiedSpace + " из " + this.capacity + " т.";
	} else {
		return "Товаров нет.";
	}
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
	if (newPosition instanceof Planet) {
		this.position = newPosition.position;
	} else {
		this.position = newPosition;
	}
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
	this.name = name;
	this.position = position;
	this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
	console.log("Планета \"" + this.name + "\". Местоположение: " + this.position + ". " + this.getAvailableAmountOfCargo());
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
	if (this.availableAmountOfCargo) {
		return "Доступно груза: " + this.availableAmountOfCargo + " т.";
	} else {
		return "Грузов нет.";
	}
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
	if (this.position.join(",") == vessel.position.join(",")){
		if (vessel.getFreeSpace() >= cargoWeight && this.availableAmountOfCargo >= cargoWeight) {
			this.availableAmountOfCargo = this.availableAmountOfCargo - cargoWeight;
			vessel.occupiedSpace = vessel.occupiedSpace + cargoWeight;
		} 		
	} else {
		console.log('Корабль не на планете');
	}
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
	if (this.position.join(",") == vessel.position.join(",")){
		if (vessel.occupiedSpace >= cargoWeight) {
			this.availableAmountOfCargo = this.availableAmountOfCargo + cargoWeight;
			vessel.occupiedSpace = vessel.occupiedSpace - cargoWeight;		
		} 
	} else {
		console.log('Корабль не на планете');
	}
}
