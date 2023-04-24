export default function useAnimation(
  animation:
    | 'grow'
    | 'fade'
    | 'slide-left'
    | 'slide-right'
    | 'slide-top'
    | 'slide-bottom'
    | 'menu'
) {
  switch (animation) {
    case 'grow':
      return {
        enter: 'transition ease-out duration-100',
        enterFrom: 'transform opacity-0 scale-95',
        enterTo: 'transform opacity-100 scale-100',
        leave: 'transition ease-in duration-75',
        leaveFrom: 'transform opacity-100 scale-100',
        leaveTo: 'transform opacity-0 scale-95',
      };
      break;
    case 'fade':
      return {
        enter: 'transition ease-out duration-300',
        enterFrom: 'opacity-0',
        enterTo: 'opacity-100',
        leave: 'transition ease-in duration-200',
        leaveFrom: 'opacity-100',
        leaveTo: 'opacity-0',
      };
      break;
    case 'slide-left':
      return {
        enter: 'transform transition ease-in-out duration-300',
        enterFrom: 'translate-x-full',
        enterTo: 'translate-x-0',
        leave: 'transform transition ease-in-out duration-300',
        leaveFrom: 'translate-x-0',
        leaveTo: 'translate-x-full',
      };
      break;
    case 'slide-right':
      return {
        enter: 'transform transition ease-in-out duration-300',
        enterFrom: '-translate-x-full',
        enterTo: 'translate-x-0',
        leave: 'transform transition ease-in-out duration-300',
        leaveFrom: 'translate-x-0',
        leaveTo: '-translate-x-full',
      };
      break;
    case 'slide-top':
      return {
        enter: 'transform transition ease-in-out duration-300',
        enterFrom: '-translate-y-full',
        enterTo: 'translate-y-0',
        leave: 'transform transition ease-in-out duration-300',
        leaveFrom: 'translate-y-0',
        leaveTo: '-translate-y-full',
      };
      break;
    case 'slide-bottom':
      return {
        enter: 'transform transition ease-in-out duration-300',
        enterFrom: 'translate-y-full',
        enterTo: 'translate-y-0',
        leave: 'transform transition ease-in-out duration-300',
        leaveFrom: 'translate-y-0',
        leaveTo: 'translate-y-full',
      };
      break;
    case 'menu':
      return {
        enter: 'transition ease-out duration-100',
        enterFrom: 'transform opacity-0 scale-95',
        enterTo: 'transform opacity-100 scale-100',
        leave: 'transition ease-in duration-75',
        leaveFrom: 'transform opacity-100 scale-100',
        leaveTo: 'transform opacity-0 scale-95',
      };
  }
}
