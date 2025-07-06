import "./SpacedBody.css";

const SpacedBody = ({children}: {children: React.ReactNode}) => {
    return (
        <div id="spaced-body">
            {children}
        </div>
    )
}

export default SpacedBody;