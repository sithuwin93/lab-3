export default (instance, contextKey) => (
  fnToCall,
  ...args
) => {
  if (!instance.context[contextKey]) {
    return null;
  }

  return instance.context[contextKey][fnToCall](...args);
};
  