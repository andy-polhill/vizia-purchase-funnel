function View(){
  this.el = document.createElement('div');
}

View.prototype.render = function render(data){
  this.el.textContent = 'hello!';
};

export default View;
