
$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
	_title: function (title) {
		title.html(this.options.title || "&#160;");
	}
}));

$(function () {
	$("#APLform").on("submit", function (e) { e.preventDefault(); });
        $("#LanguageBar").draggable({containment:"body"}).position({my:"right top",at:"left-10 top",of:"#primerToggle"});
	$("#primerToggle").on("click", function(){
		$("#APLedit").focus();
		$("#LanguageBar").toggle();
	});
	$(document).keydown(aplKeys);
	$("#APLedit").focus();
	$(document).on("click", ".tb", function () {
		if (this.value !== '\xa0') { // ignore &nbsp;
			ins(this.value);
			}
		})
	});

// --------------key handling functions

function aplKeys(e) {
	switch (e.which) {
		case 13:
			// enter key
			e.preventDefault();
			if (0 < $("#APLedit").val().length) { SendAPL(); }
			return false;
		case 27:
			// esc key
			e.preventDefault();
			$("#APLedit").val("");
			return false;
		default:
			return true;
	}
}

function SendAPL() {
	$.ajax({
		type: "POST",
		url: "index.dyalog",
		data: $("#APLedit").val(),
		dataType: "html",
		contentType: "text/plain; charset=utf-8",
		success: function (data) {
			$("#APLsession").append(data).scrollTop(10+$("#APLsession")[0].scrollHeight - $("#APLsession").height());
			$("#APLedit").val("");
		},
		error: function (jqXHR, textStatus) {
			if (0 < jqXHR.responseText.length) $("#APLsession").append(jqXHR.responseText);
			$("#APLsession").scrollTop(10+$("#APLsession")[0].scrollHeight - $("#APLsession").height());
		}
	});
}

function backspace() {
	var pos = $("#APLedit").getCursorPosition();
	var newpos = Math.max(0, (pos - 1));
	var cur = $("#APLedit").val();
	$("#APLedit").val((cur.substr(0, newpos)) + cur.substr(pos)).setCursorPosition(newpos).focus();
}

function keyreturn() {
	SendAPL();
}

function ins(txt) {
	$("#APLedit").insertChar(txt).focus();
}

$.fn.insertChar = function (txt) {
	var pos = $(this).getCursorPosition();
	var cur = $(this).val();
	$(this).val(cur.substr(0, pos) + txt + cur.substr(pos)).setCursorPosition(pos + 1);
	shiftoff();
	return this;
}

$.fn.getCursorPosition = function () {
	var pos = 0;
	var input = $(this).get(0);
	// IE Support
	if (document.selection) {
		input.focus();
		var sel = document.selection.createRange();
		var selLen = document.selection.createRange().text.length;
		sel.moveStart('character', -input.value.length);
		pos = sel.text.length - selLen;
	}
	// Firefox support
	else if (input.selectionStart || input.selectionStart == '0')
		pos = input.selectionStart;
	return pos;
}

$.fn.setCursorPosition = function (pos) {
	this.each(function (index, elem) {
		if (elem.setSelectionRange) {
			elem.setSelectionRange(pos, pos);
		} else if (elem.createTextRange) {
			var range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	});
	return this;
};

function copyToInput(obj) {
	var val = $(obj).attr("xmit");
	val = (val == undefined ? $(obj).html() : val);
	$("#APLedit").val(val).setCursorPosition(0).focus();
	return false;
}

$(function () {
	var $k = $("#APLedit"),
	km = {}, // keymap
	a = '`1234567890-= qwertyuiop[] asdfghjk l;\'\\ zxcvbnm,./  ~!@#$%^&*()_+ QWERTYUIOP{} ASDFGHJKL:"| ZXCVBNM<>?'.replace(/ /g, ''),
	b = '`¨¯<≤=≥>≠∨∧×÷ ?⍵∊⍴~↑↓⍳○*←→ ⍺⌈⌊f∇∆∘\'⎕⍎⍕ ⊢  ⊂⊃∩∪⊥⊤|⍝⍀⌿  ⋄⌶⍫⍒⍋⌽⍉⊖⍟⍱⍲!⌹ ?⍵⍷⍴⍨↑↓⍸⍥⍣⍞⍬ ⍺⌈⌊F∇∆⍤⌸⌷≡≢⊣ ⊂⊃∩∪⊥⊤|⍪⍙⍠'.replace(/ /g, ''),
	pending = false; // has the ` key been just pressed?
	km[' '] = '⋄';
	for (var i = 0; i < a.length; i++) km[a[i]] = b[i];
	$k.keypress(function (e) {
		var c = String.fromCharCode(e.which);
		if (pending) {
			var s = $k.val(), p = $k.getCursorPosition();
			pending = false;
			if (km[c] && s[p - 1] === '`') {
				$k.val(s.slice(0, p - 1) + (km[c] || c) + s.slice(p)).setCursorPosition(p);
				return false;
			}
		} else if (c === '`') {
			pending = true;
		}
	});
});
