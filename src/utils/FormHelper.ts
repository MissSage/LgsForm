export const handleHighlight = (config:any, ...args:any[]) => {
  config.handleHighlight && config.handleHighlight(...args)
}
export const handleClick = (config:any, ...args:any[]) => {
  config.handleClick && config.handleClick(...args)
}
export const handleZRClick = (config:any, ...args:any[]) => {
  config.handleZRClick && config.handleZRClick(...args)
}
export const onChange = (config:any, ...args:any[]) => {
  config.onChange && config.onChange(...args)
}
export const nodeClick = (config:any, ...args:any[]) => {
  config.nodeClick && config.nodeClick(...args)
}
