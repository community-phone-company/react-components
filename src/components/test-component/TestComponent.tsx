import React from "react";

export default class TestComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <h1>
                Test Component
            </h1>
        );
    }
}

interface Props {
}

interface State {
}
