import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPicker from "@/components/ColorPicker";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
          Color Stock
        </h1>

        <Tabs defaultValue="picker" className="space-y-4">
          <TabsList className="bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="picker">パレット作成</TabsTrigger>
            <TabsTrigger value="settings">設定</TabsTrigger>
          </TabsList>
          <TabsContent value="picker">
            <ColorPicker />
          </TabsContent>
          <TabsContent value="settings">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">設定</h2>
              <p className="text-zinc-600">設定項目を追加予定</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
