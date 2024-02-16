export default function InputBox(props: any) {
    return (
        <div>
            <label className="label">
                <span className="text-base label-text">{props.label}</span>
            </label>
            <input {...props.field} type={props.type} placeholder={props.placeholder}
                className="w-full input input-bordered" />
        </div>
    )
}