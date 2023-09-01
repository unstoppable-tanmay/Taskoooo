type Task = {
  id: String;
  index: Number;
  name: String;
  desc: String;
  time: String;
};
type Card = {
  id: String;
  index: Number;
  name: String;
  tasks: Array<Task>;
};
