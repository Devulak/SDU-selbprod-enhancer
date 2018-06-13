function CheckECTSPoints()
{
	// Init
	this.totalECTSPoints = 0;
	this.classes = [];
	this.classesPassed = [];

	this.fetchClasses = function()
	{
		var resultTable = document.getElementById("resultTable");
		var tBody = resultTable.getElementsByTagName("tbody")[0];
		var tResult = tBody.getElementsByTagName("tr");

		for (var i = 0; i < tResult.length; i++)
		{
			var values = this.getCorrectValues(tResult[i]);
			this.classes.push(values); // put into classes

			if(this.passed(values))
			{
				this.totalECTSPoints += Number(values['ETCS']);
				this.classesPassed.push(values);
			}
		}
	}

	this.passed = function(values)
	{
		var passed = false;
		if (values['gradesScale'].includes("F") || values['grades'].includes("I"))
		{
			passed = false;
		}
		else
		{
			passed = true;
		}
		return passed;
	}

	this.getCorrectValues = function(values)
	{
		var correctValues = [];
		var values = values.getElementsByTagName("td");

		correctValues['code'] = values[0].innerHTML;
		correctValues['name'] = values[1].innerHTML.replace(/^ /g, '');;
		correctValues['grades'] = values[values.length-3].innerHTML.replace(/\&nbsp;/g, '');
		correctValues['gradesScale'] = values[values.length-2].innerHTML.replace(/\&nbsp;/g, '');
		correctValues['ETCS'] = values[values.length-1].innerHTML.replace(/\&nbsp;/g, '');

		return correctValues;
	}

	this.getClasses = function()
	{
		console.log("================================");
		for (var i = this.classes.length - 1; i >= 0; i--)
		{
			var values = this.classes[i];
			var passed = this.passed(values);
			console.log("Checking " + values['name'] + " (" + values['code'] + ") ... " + (passed ? "PASSED" : "FAILED") + " ... " + values['ETCS'] + " ETCS");
		}
	}

	this.getClassesPassed = function()
	{
		console.log("================================");
		for (var i = 0; i < this.classesPassed.length; i++)
		{
			var values = this.classesPassed[i];
			console.log(values['name'] + " (" + values['code'] + ") ... " + values['ETCS'] + " ETCS");
		}
	}

	this.getTotalPassedECTS = function()
	{
		console.log("================================");
		console.log(this.totalECTSPoints);
	}

	this.fetchClasses();
}

// Edit as you like
var checker = new CheckECTSPoints();
checker.getClasses();
checker.getClassesPassed();
checker.getTotalPassedECTS();