var mithril = require('mithril');
const Behavior = require('./behavior');
const BehaviorForm = require('./behavior_form');
const Subject = require('./subject');
const SubjectForm = require('./subject_form');
const SubjectGroupForm = require('./subject_group_form');
const SchemeRepository = require('../../repositories/scheme_repository');

const SchemeCreationForm = {
  controller: function() {
    var ctrl = { scheme: SchemeRepository.new() };
    ctrl.parentBehaviors = function() {
      this.scheme.behaviors.filter(function(behavior) {
        if (behavior.parent && behavior.parent.length > 0) {
          return behavior
        }
      });
    }.bind(ctrl);

    return ctrl;
  },

  view: function (ctrl) {
    return <form class="box">
      <h1 class="context-marker">Create Scheme</h1>
      <p class="field">
        <div class="control-group">
          <label for="scheme_name">
            Scheme Name
          </label><br />
          <input
            type="text"
            class="field_entry"
            id="scheme_name"
            name="scheme[name]"
            value={ctrl.scheme.name}
          />
        </div>
      </p>
      <p class="field">
        <div class="control-group">
          <label for="scheme_locked">
            Lock to User
          </label>
          <input
            type="checkbox"
            id="scheme_locked"
            name="scheme[locked]"
            checked={ctrl.scheme.locked}
          />
        </div>
      </p>
      <fieldset class="field">
        <legend>Subject Groups
        </legend>
        <p class="list-control">
          <a class="button button-add" onclick={() => { ctrl.scheme.addSubjectGroup() }}>Add</a>
        </p>
        {ctrl.scheme.subjects.map((subject, index) => {
          return mithril.component(SubjectGroupForm, {
            subject: subject,
            index: index
          })
        })}
      </fieldset>
      <fieldset class="field">
        <legend>Subjects
        </legend>
        <p class="list-control">
          <a class="button button-add" onclick={() => ctrl.scheme.addSubject()}>Add</a>
        </p>
        {ctrl.scheme.subjects.map((subject, index) => {
          var component = subject.editing ? SubjectForm : Subject;
          return mithril.component(component, {
            subject: subject,
            index: index,
            subjectGroups: ctrl.scheme.subjectGroups
          })
        })}
      </fieldset>
      <fieldset class="field">
        <legend>Behaviors
        </legend>
        <p class="list-control">
          <a class="button button-add" onclick={() => ctrl.scheme.addBehavior()}>Add</a>
        </p>
        {ctrl.scheme.behaviors.map((behavior, index) => {
          var component = behavior.editing ? BehaviorForm : Behavior;
          return mithril.component(component, {
            parentBehaviors: ctrl.parentBehaviors(),
            behavior: behavior,
            index: index
          });
        })}
      </fieldset>
    </form>;
  }
};

module.exports = SchemeCreationForm;
