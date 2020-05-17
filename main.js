var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomInteger(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function get_atr(s) {
	var i = 1;
	var atr = "";
	if (s == "" || s == "\0") return "";
	while (s[i] != '\0') {
		if (s[i] != '!' && s[i] != '|' && s[i] != '(' && s[i]!= ')' && s[i]!= '0' && s[i]!= '1' && s[i]!='&') atr += s[i];
		i++;
	}
	return atr;
}

function check_atr(atr) {
	var i, j;
	for (i = 0; i < atr.length; i++)
		for (j = i+1; j < atr.length; j++)
			if (atr[i] == atr[j]) return false;
	return true;
}

function check_big(s){
	var rx1 = new RegExp("(\\(([A-Z]\\|)+[A-Z]\\))|(\\(\\(!([A-Z]\\)\\|)+[A-Z]\\))|(\\(([A-Z]\\|)+\\(![A-Z]\\)\\))");
	var formules = [];
	var i;
	var j;
	var atr_0;
	var atr;
	
	s1 = s;
	stop = 1;
	i = 0;
	while(stop > 0){
		stop = 0;
		if (rx1.test(s1)) {
			stop++;
			formules[i] = s1.match(rx1)[0];
			i++;
			s1 = s1.replace(rx1, '8');
		}
	}
	
	for (i = 0; i < formules.length; i++) {
		for (j = i+1; j < formules.length; j++)
			if (formules[i] == formules[j]) return false;
	}

	atr_0 = get_atr(formules[0]+'\0');

	if (check_atr(atr_0) == false) return false;

	for (i = 1; i < formules.length; i++) {
		atr = get_atr(formules[i]+'\0');
		if (check_atr(atr) == false) return false;
		if (atr != atr_0) return false;
		atr = "";
	}
	return true;
}

function full_check_atr(atr_0, atr){
	var atr2 = "";
	var atr_start = atr_0;
	var i, j;
	if (atr_0 == "" || atr == "" || atr_0 == "\0" || atr == "\0") return false; 
	for (i=0; i<atr_0.length; i++){
		for (j=0; j<atr.length; j++)
			if (atr_0[i] != atr[j]){
				atr2 += atr[j];
			}
			if (atr2 == atr) return false;
			atr = atr2;
			atr2 = "";
	}
	return true;
}

function check_in(s) {
	var rx1 = new RegExp("&");
	var rx2 = new RegExp("\\(([A-Z]\\|[A-Z])\\)|\\(\\((![A-Z]\\)\\|[A-Z])\\)|\\(([A-Z]\\|\\(![A-Z]\\))\\)|\\((\\(![A-Z]\\)\\|\\(![A-Z]\\))\\)");
	var count = 0;
	var i,j;
	var ss = "";
	var sk = "";
	var a = [];
	var atr = "";
	var atr_0 = "";
	var formules = [];
	var kFormules = [];
	j = 0;
	//console.log(s);
	if (!rx1.test(s)) return true;
	for (i=0; i<s.length; i++){
		if (s[i]=='&') continue;
		//console.log(i);
		//console.log(count);
		if (s[i] == '(') count++;
		//console.log(count);
		if (s[i] == ')') count--;
		//console.log(count);
		//console.log(s[i]);
		if (count == 0) break;
		//console.log(count);
		if (count > 1) ss += s[i];
		if (count == 1 && i != 0) {
			//console.log(ss);
			formules[j] = ss;
			j++;

			if (rx2.test(ss)) {
				sk = ss.match(rx2);
				a = get_atr(sk[0] + '\0');
				if (check_atr(a) == false) return false;
				kFormules.push(sk[0]); 
				ss = ss.replace(rx2,'1');
			}
			if (atr_0 == "") {
				atr_0 = get_atr(ss+'\0');
				if (check_atr(atr_0+'\0') == false) return false;
			}
			else {
				atr = get_atr(ss+'\0');
				if (check_atr(atr+'\0') == false) return false;
			}
			ss = "";
			//console.log(atr_0);
			//console.log(atr);
			if (atr != "") {
				//console.log(full_check_atr(atr_0, atr));
				if (full_check_atr(atr_0, atr) == false) return false;
			}
		}
	}
			for (i = 0; i < formules.length; i++)
				for (j = i+1; j < formules.length; j++)
					if (formules[i] == formules[j]) return false;

	atr_0 = get_atr(kFormules[0]+'\0');
	if (!check_atr(atr_0)) return false;
	atr = get_atr(kFormules[1]+'\0');
	if (!check_atr(atr)) return false;
	if (atr != atr_0) return false;
	return true;
}

function check_formule(s) {
	var stop = 1;
	var s1 = "";
	var s_check = s;
	var a = [];
	var rx5 = new RegExp("(\\(![A-Z]\\))|[A-Z]");
	var rx1 = new RegExp("(\\(![A-Z]\\))|[A-Z]");
	//var rx2 = new RegExp("\\(((\\(!){0,1}[A-Z]\\){0,1}\\|)(\\(!){0,1}[A-Z]\\){0,1}");
	var rx2 = new RegExp("\\(([A-Z]\\|[A-Z])\\)|\\(\\((![A-Z]\\)\\|[A-Z])\\)|\\(([A-Z]\\|\\(![A-Z]\\))\\)|\\((\\(![A-Z]\\)\\|\\(![A-Z]\\))\\)");
	var rx3 = new RegExp("\\((\\(((\\(!){0,1}[A-Z]\\){0,1}\\|)+(\\(!){0,1}[A-Z]\\){0,1}\\)&)+\\(((\\(!){0,1}[A-Z]\\){0,1}\\|)+(\\(!){0,1}[A-Z]\\){0,1}\\)\\)");
	var rx4 = new RegExp("\\((1\\|1)\\)|\\((1&1)\\)");
	var rx6 = new RegExp("\\(([A-Z]&\\(![A-Z]\\))\\)|\\((\\(![A-Z]\\)&[A-Z])\\)");
	var rx7 = new RegExp("0|1");

	if(!rx5.test(s)) return false;

	if (rx7.test(s)) return false;
	if (rx6.test(s)) s1 = s.match(rx6);
	if (s1[0] == s){
		//console.log("xxx");
		a = get_atr(s + '\0');
		//console.log(a);
		if (a[0] == a[1]) return true;
		else return false;
	}

	while (stop > 0){
		stop = 0;
		if (rx3.test(s)) {
			stop++;
			if (check_big(s) == false) return false;
			s1 = s.replace(rx3,'1');
			s = s1;
			//console.log(s);
		}
		if (rx2.test(s)) {
			stop++;
			s1 = s.match(rx2);
			a = get_atr(s1[0] + "\0");
			if (check_atr(a) == false) return false; 
			s1 = s.replace(rx2,'1');
			s = s1;
			//console.log(s);
		}
		if (rx1.test(s)) {
			stop++;
			s1 = s.replace(rx1,'1');
			s = s1;
			//console.log(s);
		}
		if(rx4.test(s)){
			//console.log(s_check);
			//console.log("lel");
			stop++;
			if (check_in(s_check) == false) return false;
			//console.log(check_in(s_check));
			s1 = s.replace(rx4,'1');
			s = s1;
		}
		//console.log(s);
		if(s == '1' || s == '1\0') return true;
	
	}
	return false;
}

function random_formule(mm) {
	var i, j = 0, chance;
	var formule = "";
	var atr_amount = 2 + randomInteger(0, 6);
	var atr = "";
	var correct;
	for (i = 0; i < atr_amount; i++) {
		chance = 4;
		while (chance != 0) {
			chance = randomInteger(0, 3);
			if (chance == 0) atr += alphabet[j];
			j++;
			if (alphabet[j] == '\0') j = 0;
		}
	}

	formule += '(';
	chance = randomInteger(0, 2);
	if (chance == 1) formule += '!';
	formule += atr[0];

	for (i = 1; i < atr_amount; i++) {
		chance = randomInteger(0, 3);
		switch (chance) {
		case 0: formule += '-'; formule += '>'; break;
		case 1: formule += '&'; break;
		case 2: formule += '|'; break;
		}
		chance = randomInteger(0, 2);
		if (chance == 1) formule += '!';
		formule += atr[i];
	}
	formule += ')';

	label = `<br><input type='checkbox' id='${mm+10}'><label id='${mm}'>${formule}</label	>`
	document.body.innerHTML += label;
	return 0;
}

function not_random_formule(mm) {
	var i, j = 0, k, chance, extra, chance2, extra2;
	var formule = "";
	var atr = "";
	var min = [];
	var mini = "";
	var ff = "";
	var correct;
	var tr;
	for (i = 0; i < 3; i++) {
		chance = 4;
		while (chance != 0) {
			chance = randomInteger(0, 1);
			if (chance == 0) atr += alphabet[j];
			j++;
			if (alphabet[j] == '\0') j = 0;
		}
	}
	for (i=0; i<2; i++)
			for (k = 0; k < 2; k++) {
				mini += '(';
				if (i == 1) {
				mini += '(';
				mini += '!';
				}
				mini += atr[0];
				if (i == 1) mini += ')';
				mini += '|';

				if (k == 1) {
				mini += '(';
				mini += '!';
				}
				mini += atr[1];
				if (k == 1) mini += ')';
				mini += ')';
				min.push(mini);
				mini = "";
			}
	formule += '(';
	chance = randomInteger(0, 1);
	if (chance == 0) {
		j = 1;
		for (i = 0; i < 4; i++) {
			extra = randomInteger(0, 3);
			if (extra == 0) {
				if (j != 1) formule += '&';
				for (k = 0; k < min[i].length; k++) {
					ff = min[i];
					formule += ff[k];
					j++;
				}
			}
		}
		formule += ')';
		if (formule == '()') formule = "(A|B)";
		label = `<br><input type='checkbox' id='${mm+10}'><label id='${mm}'>${formule}</label>`
		document.body.innerHTML += label;
		return 0;
	}
	else {
		chance2 = randomInteger(0, 1);
		if (chance2 == 0) {
			j = 1;
			for (i = 0; i < 4; i++) {
				extra = randomInteger(0, 1);
				if (extra == 0) {
					if (j != 1) formule += '&';
					for (k = 0; k < min[i].length; k++) {
						ff = min[i];
						formule += ff[k];
						j++;
					}
				}
			}
			formule += '&';
			j++;
			for (i = 0; i < 8; i++) {
				extra = randomInteger(0, 1);
				if (extra == 0) {
					for (k = 0; k < min[i].length; k++) {
						ff = min[i];
						formule += ff[k];
						j++;
					}
					if (i < 7) {
						formule += '&';
						j++;
					}
				}
			}
			formule += ')';
			label = `<br><input type='checkbox' id='${mm+10}'><label id='${mm}'>${formule}</label>`
			document.body.innerHTML += label;
			return 0;
		}
		else {
			j = 1;
			for (i = 0; i < 4; i++) {
				extra = randomInteger(0, 1);
				if (extra == 0) {
					if (j != 1) formule += '&';
					for (k = 0; k < min[i].length; k++) {
						ff = min[i];
						formule += ff[k];
						extra2 = randomInteger(0, 2);
						if (extra2 == 0) {
							if (formule[j] == '|') { formule += '|'; j++; }
							if (formule[j] != '|' & formule[j] != '(') {ff = min[i]; formule += ff[k]; j++; }
						}
						j++;
					}
				}
			}
			formule += ')';
			label = `<br><input type='checkbox' id='${mm+10}'><label id='${mm}'>${formule}</label>`
			document.body.innerHTML += label;
			return 0;
		}

	}
	return 0;
}

function start_test(quest) {
	var i;
	var x, res = 0, answer, correct;
	for (i = 0; i < quest; i++) {
		x = randomInteger(0, 2);
		switch (x) {
		case 0: {
			correct = random_formule(i);
			break;
		}
		case 1: {
			correct = not_random_formule(i);
			break;
		}
		}
	}
	label = `<br><input type='button' id='res_button' value = 'Завершить тест' onclick="endTest('${quest}')">`
	document.body.innerHTML += label;
	//alert("Your result is " + res + " from " + quest);
}

function endTest(quest){
	var x;
	var correct = 0;
	var v = true;
	for (var i = 0; i<quest; i++){
		x = check_formule(String(document.getElementById(i).innerText)+'\0');
		if (x == 0) v = false;
		else v = true;
		if (v == document.getElementById(i+10).checked) correct++;
	}
	var str = "Результат: "+ correct + " из " + quest;
	label = `<br><label id = 'fn'>${str}</label>`;
	document.body.innerHTML += label;
	//alert("Ur result is "+ correct + " from " + quest);
}

function main(){
	var b;
	var formuleF = document.getElementById("input").value;
	b = check_formule(formuleF);
	if (b) document.getElementById("output").innerHTML = "Formule is SCNF";
	else document.getElementById("output").innerHTML = "Formule is not SCNF";
}

function test(){
	var quest = document.getElementById("test_text").value;
	if (quest > 10) quest = 10;
	if (quest < 5) quest = 5;
	start_test(quest);
}

//(((A|B)|(C|D))&(((!A)|B)|(C|D)))