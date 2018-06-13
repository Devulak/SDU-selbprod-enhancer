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
		var total;

		for (var i = 0; i < tResult.length; i++)
		{
			if(tResult[i].id == "Total")
			{
				total = tResult[i];
				continue;
			}
			var values = this.getCorrectValues(tResult[i]);
			this.classes.push(values); // put into classes

			if(this.passed(values))
			{
				this.totalECTSPoints += Number(values['ETCS']);
				this.classesPassed.push(values);
				tResult[i].style = "background-color: #57bb8a;";
			}
			else
			{
				tResult[i].style = "background-color: #e67c73;";
			}
		}
		if(!total)
		{
			var total = tBody.lastElementChild.cloneNode(true);
			total.id = "Total";
			total.style = "";
			tBody.appendChild(total);
		}
		totalChildren = total.children;
		for (var i = 0; i < totalChildren.length; i++)
		{
			totalChildren[i].innerHTML = "";
		}
		totalChildren[totalChildren.length - 1].innerHTML = this.totalECTSPoints.toFixed(1);


		var totalWeight = 0;
		var totalGrade = 0;

		var totalUnweighted = 0;
		var totalUnweightedGrade = 0;
		for (var i = 0; i < this.classesPassed.length; i++)
		{
			if(!isNaN(this.classesPassed[i]['grades']))
			{
				totalWeight += Number(this.classesPassed[i]['ETCS']);
				totalGrade += Number(this.classesPassed[i]['ETCS'] * this.classesPassed[i]['grades']);
				totalUnweighted++;
				totalUnweightedGrade += Number(this.classesPassed[i]['grades']);
			}
		}
		totalChildren[totalChildren.length - 3].innerHTML = (totalGrade / totalWeight).toFixed(1) + "\n\r(Unweighted: " + (totalUnweightedGrade / totalUnweighted).toFixed(1) + ")";
	}

	this.passed = function(values)
	{
		var passed = false;
		if (values['gradesScale'].includes("F") || values['grades'].includes("AV") || values['grades'].includes("I"))
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

	this.fetchClasses();
}

// Edit as you like
var checker = new CheckECTSPoints();