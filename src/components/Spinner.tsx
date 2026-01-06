// Spinner component som visas medans data laddas, körde er blåa färg #4DB4E3 för att göra designen consistent

const Spinner = ({
  size = 'h-15 w-15',
  border = 'border-t-2 border-b-2',
  color = 'border-[#4DB4E3]',
  className = '',
}) => (
  <div
    className={`p-20 flex justify-center text-5xl items-center ${className}`}
  >
    <span
      className={`animate-spin rounded-full ${size} ${border} ${color}`}
    ></span>
  </div>
)

export default Spinner