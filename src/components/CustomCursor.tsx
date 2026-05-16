interface Props {
    pos: { x: number; y: number }
    ringPos: { x: number; y: number }
    hovered: boolean
}

export default function CustomCursor({ pos, ringPos, hovered }: Props) {
    return (
        <>
            <div
                className={`cursor ${hovered ? 'hovered' : ''}`}
                style={{ left: pos.x, top: pos.y }}
            />
            <div
                className={`cursor-ring ${hovered ? 'hovered' : ''}`}
                style={{ left: ringPos.x, top: ringPos.y }}
            />
        </>
    )
}
