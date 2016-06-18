var m = require('mithril');

const RadioGroup = require('../inputs/radio_group.js');

const BehaviorForm = {
  controller: function(args) {
    // change to args.behavior || new Behavior() when model created
    // TODO: how to account for parent/child group?
    var ctrl = {
      behavior: args.behavior,
      index: args.index,
    }
    ctrl.selected_type = function(key) {
      return this.behavior.type == key
    }.bind(ctrl);
    ctrl.selected_target = function(key){
      return this.behavior.target == key
    }.bind(ctrl);
    return ctrl;
  },
  view: function(ctrl) {
    return <div>
      <div class="control-group">
        <label for={`scheme_behavior_${ ctrl.index }_name`}>
          Name
        </label>
        <input
          type="text"
          id={`scheme_behavior_${ ctrl.index }`}
          name={`scheme[behavior][${ ctrl.index }][name]`}
          value={ctrl.behavior.name}
          onchange={(e)=> { ctrl.behavior.name = e.target.value }}
        />
      </div>

      <RadioGroup text="Type"
          namespace="scheme"
          item="behavior"
          attribute="type"
          index={ctrl.index}
          collection={[
            ['State','state'],
            ['Event','event']
          ]}
          checked={ ctrl.selected_type }
          update={ (newValue) => { ctrl.behavior.type = newValue } }
        />

      <RadioGroup text="Target Type"
          namespace="scheme"
          item="behavior"
          attribute="target"
          index={ctrl.index}
          collection={[
            ['Self','self'],
            ['Other','other'],
            ['None','none']
          ]}
          checked={ ctrl.selected_target }
          update={ (newValue) => { ctrl.behavior.target = newValue } }
        />

      <div class="control-group">
        <label for={`scheme_behavior_${ ctrl.index }_mutually_exclusive`}>
          Mutually Exclusive?
        </label>
        <input
          type="checkbox"
          id={`scheme_behavior_${ ctrl.index }_mutually_exclusive`}
          name={`scheme[behavior][${ ctrl.index }][mutually_exclusive]`}
          checked={ctrl.behavior.mutually_exclusive}
          onchange={(e)=> { ctrl.behavior.mutually_exclusive = e.target.checked }}
        />
      </div>
    </div>
  }
};

module.exports = BehaviorForm;
