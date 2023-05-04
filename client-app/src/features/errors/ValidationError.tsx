import { error } from "console";
import { Message, MessageItem } from "semantic-ui-react";

interface Props {
    errors: any;
}

export default function VallidationError({ errors }: Props) {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: any, i:any) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )

}