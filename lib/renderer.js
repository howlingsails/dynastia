var colors        = require('colors/safe'),
    prettyjson    = require('prettyjson'),
    hr            = '---------------------------------------------',
    renderOptions = { 
      numberColor: 'cyan', 
      stringColor: 'white', 
      keysColor: 'yellow' 
    },
    prev;

var Renderer = {

  // render a person
  person: function (person) {
    console.log(colors.white('\n' + hr + '\nPERSON: \n' + hr));
    console.log(prettyjson.render(person, renderOptions));
    console.log(colors.white(hr + '\n'));
  },

  // get the successor from the person
  getSuccessor: function (person) {
    var successor;

    // get the successor if we can
    if (person.issue !== undefined) {
      person.issue.forEach(function (child) {
        if (child.successor) {
          successor = child;
        }
      });
    }

    return successor;
  },

  // determine if there is a successor or not
  hasSuccessor: function (person) {
    if (Renderer.getSuccessor(person) === undefined) {
      return false;
    } else {
      return true;
    }
  },

  // render a year
  year: function (year) {
    if (year >= 0) {
      return year + ' CE';
    } else {
      return Math.abs(year) + ' BCE'
    }
  },

  // render a name
  name: function (person) {
    return (
      person.name + ' ' + 
      Renderer.gender(person.gender) + 
      ' (' + Renderer.year(person.birth) + ' - ' + Renderer.year(person.death) + ')'
    );
  },

  // render gender
  gender: function (gender) {
    if (gender === 'female') {
      return '♀';
    } else {
      return '♂';
    }
  },

  // walk through the dynasty
  walkDynasty: function (dynasty, first) {
    var output, name, li;

    if (first === undefined) {
      first = true;
    }

    name = Renderer.name(dynasty);

    // output the beginning or continue with the next
    if (first) {
      output = colors.white('\nDynasty begins with:');
      output += '\n' + colors.white(hr + hr);
      output += '\n' + colors.white('Regnant: ') + colors.cyan.underline.bold(name);
    } else {
      output = colors.white('Succeeded by:');
      output += '\n' + colors.white(hr + hr);
      output += '\n' + colors.white('Regnant: ') + colors.cyan.underline.bold(name) + colors.white(' son of ' + prev);
    }

    // output the spouse
    if (dynasty.spouse) {
      output += colors.white('\nConsort: ' + colors.magenta(Renderer.name(dynasty.spouse)));
    }

    // output and reset
    console.log(output);
    output = '';

    // output the issue
    if (dynasty.issue) {
      console.log('\n' + colors.white('  Issue:'));
      dynasty.issue.forEach(function (child) {
        li = Renderer.name(child);

        // highlight if it's the successor
        if (child.successor) {
          li = colors.yellow.bold('(*)') + ' ' + colors.yellow.bold.underline(li);
        } else {
          li = colors.white(' -  ' + colors.blue(li));
        }

        output += '     ' + li + colors.white('\n         Married: ' + Renderer.name(child.spouse)) + '\n\n';
      });
      console.log(output);
    }

    // continue w/ the successor if we have it
    if (Renderer.hasSuccessor(dynasty)) {
      prev = dynasty.name;
      Renderer.walkDynasty(Renderer.getSuccessor(dynasty), false);
    }
  },

  // render the dynasty
  dynasty: function (dynasty) {
    console.log(colors.white('\n' + hr + hr + '\nDYNASTY: \n' + hr + hr));
    Renderer.walkDynasty(dynasty);
    console.log(colors.white(hr + hr + '\n'));
  }
}

module.exports = Renderer;