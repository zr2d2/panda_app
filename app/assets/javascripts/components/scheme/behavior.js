const Behavior = {
  controller: function (args) {
    return {
      behavior: args.behavior,
      index: args.index
    }
  },
  view: function (ctrl) {
    return <div class="control-group">
      <div><a class="button button-remove">-</a> {ctrl.behavior.name}</div>
      <span>Type: {ctrl.behavior.type} - ME: {ctrl.behavior.mutually_exclusive} - Target: {ctrl.behavior.target}</span>
    </div>
  }
};

module.exports = Behavior;
