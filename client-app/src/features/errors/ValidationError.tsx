import { error } from "console";
import { Message, MessageItem } from "semantic-ui-react";

interface Props {
    errors: string[];
}

export default function VallidationError({ errors }: Props) {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: string, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )

}