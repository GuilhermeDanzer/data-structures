import { useSprings, animated } from '@react-spring/web'

export default function MyComponent() {
  const springs = useSprings(2, {
    from: { opacity: 0 },
    to: { opacity: 0.5 },
  })

  return (
    <div>
      {springs.map(props => (
        <animated.div style={{ backgroundColor: 'blue', ...props }}>
          Hello World
        </animated.div>
      ))}
    </div>
  )
}
