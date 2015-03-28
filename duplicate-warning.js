if (Meteor.isClient) {
  Template.hello.onCreated(function () {
    this._seconds = new ReactiveVar(parseInt(new Date().valueOf() / 1000));
    this._handle = Meteor.setInterval(function () {
      this._seconds.set(parseInt(new Date().valueOf() / 1000));
    }.bind(this), 1000);
  });

  Template.hello.onDestroyed(function () {
    Meteor.clearInterval(this._handle);
  });

  Template.hello.helpers({
    list: function () {
      // To register dependency.
      Template.instance()._seconds.get();
      return _.shuffle(_.map(_.range(5), function (i) {return {_id: i}}));
    }
  });
}
