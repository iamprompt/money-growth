import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="py-2 px-3 max-w-screen-lg mx-auto">
        <p className="text-center">
          Developed by{' '}
          <Link
            href="https://github.com/iamprompt"
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            iamPrompt
          </Link>
        </p>
        <p className="text-center text-xs mt-2">
          การคำนวณบนเว็บไซต์นี้เป็นการคำนวณเบื้องต้นเท่านั้น
          ไม่ใช่ข้อมูลทางการจากธนาคาร จำนวนดอกเบี้ยที่ได้รับจริงอาจมีความแตกต่าง
        </p>
      </div>
    </footer>
  )
}
