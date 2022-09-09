export default function TextInput({ title, ...attributes }) {
    return (
        <>
            <label className="block text-sm font-medium text-gray-700">
                {title}
            </label>
            <input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full p-2 text-xl sm:text-sm border border-gray-300 rounded-md"
                {...attributes}
            />
        </>
    );
}
