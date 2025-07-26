import { Calculator } from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Hesap Makinesi</h1>
          <p className="text-muted-foreground">Modern ve kullanışlı hesap makinesi</p>
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
