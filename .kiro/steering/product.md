# Product

Wind farm (风电场) monitoring dashboard, a large-screen web UI for operators. The UI is in Chinese (zh).

## Main views
- `/` 系统首页: system dashboard (`DashboardView`)
- `/monitor` 风场监视: farm-level overview (`HomeView`): wind overview, energy, grid/sports data, wind status, battery, alarms
- `/about/:devId?` 风机监视: single-turbine detail (`AboutView`): pitch, fan data, box transformer, electricity, real-time faults

## Key behaviors
- Near-real-time data via polling (second-level refresh). Only devices in or near the viewport are refreshed and rendered. Timers and DOM are cleaned up on page leave or tab switch.
- Data is scoped by `projectId` (wind farm) and `devId` (turbine), passed top-down as props.
- All backend data is currently mocked (mockjs). There is no real backend yet.
- Designed for large screens. Cross-browser and cross-resolution testing is limited.
