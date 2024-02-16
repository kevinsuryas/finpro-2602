export default function SubmitFormikButton({ data }: any) {
    return (
        <button disabled={!(data.dirty && data.isValid)} type="submit" className="btn btn-block bg-primary text-white mt-4 hover:bg-primary hover:opacity-50">Login</button>
    )
}