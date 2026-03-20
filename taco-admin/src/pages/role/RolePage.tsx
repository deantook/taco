import { useCallback, useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { ApiError } from '../../api/client'
import * as roleApi from '../../api/role'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { formatDisplayDate } from '../../lib/date'
import { parseOptionalJson } from '../../lib/json'
import type { Role } from '../../types/api'

export function RolePage() {
  const [rows, setRows] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [listError, setListError] = useState<string | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [categoryText, setCategoryText] = useState('')
  const [description, setDescription] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setListError(null)
    try {
      const data = await roleApi.fetchRoleList()
      setRows(data)
    } catch (e) {
      setListError(e instanceof ApiError ? e.message : '加载失败')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  function resetForm() {
    setCode('')
    setName('')
    setCategoryText('')
    setDescription('')
    setFormError(null)
  }

  function openCreate() {
    setMode('create')
    setEditId(null)
    resetForm()
    setModalOpen(true)
  }

  function openEdit(row: Role) {
    if (row.id == null) {
      return
    }
    setMode('edit')
    setEditId(row.id)
    setCode(row.code ?? '')
    setName(row.name ?? '')
    setCategoryText(
      row.category != null ? JSON.stringify(row.category, null, 2) : ''
    )
    setDescription(row.description ?? '')
    setFormError(null)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setFormError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) {
      setFormError('请填写角色编码')
      return
    }
    if (!name.trim()) {
      setFormError('请填写角色名称')
      return
    }
    let category: unknown = null
    try {
      if (categoryText.trim()) {
        category = parseOptionalJson(categoryText)
      }
    } catch {
      setFormError('分类（JSON）格式不正确，字符串请写成 "cast" 形式')
      return
    }

    const body: Partial<Role> = {
      id: mode === 'edit' ? editId : null,
      code: code.trim() || null,
      name: name.trim() || null,
      category,
      description: description.trim() || null,
    }

    setSaving(true)
    setFormError(null)
    try {
      if (mode === 'create') {
        delete body.id
        await roleApi.createRole(body)
      } else if (editId != null) {
        await roleApi.updateRole(editId, body)
      }
      closeModal()
      await load()
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : '保存失败')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('确定删除该角色？')) {
      return
    }
    try {
      await roleApi.deleteRole(id)
      await load()
    } catch (e) {
      window.alert(e instanceof ApiError ? e.message : '删除失败')
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          共 {rows.length} 条（全量列表）
        </p>
        <Button variant="primary" type="button" onClick={openCreate}>
          <Plus className="size-4" strokeWidth={1.75} />
          新建角色
        </Button>
      </div>

      <Card className="overflow-hidden">
        {listError ? (
          <p className="p-6 text-sm text-red-600 dark:text-red-400">
            {listError}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/8 bg-neutral-50/80 dark:border-white/10 dark:bg-white/5">
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    ID
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    编码
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    名称
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    分类
                  </th>
                  <th className="hidden max-w-[240px] px-4 py-3 font-medium text-neutral-600 md:table-cell dark:text-neutral-400">
                    说明
                  </th>
                  <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
                    创建时间
                  </th>
                  <th className="w-32 px-4 py-3 text-right font-medium text-neutral-600 dark:text-neutral-400">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-neutral-500"
                    >
                      加载中…
                    </td>
                  </tr>
                ) : !rows.length ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-neutral-500"
                    >
                      暂无数据
                    </td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr
                      key={row.id != null ? String(row.id) : `row-${idx}`}
                      className="border-b border-black/6 last:border-0 dark:border-white/6"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-neutral-500">
                        {row.id ?? '—'}
                      </td>
                      <td className="max-w-[120px] truncate px-4 py-3 font-mono text-xs text-neutral-800 dark:text-neutral-200">
                        {row.code ?? '—'}
                      </td>
                      <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                        {row.name ?? '—'}
                      </td>
                      <td className="max-w-[140px] truncate px-4 py-3 text-neutral-600 dark:text-neutral-300">
                        {row.category != null
                          ? typeof row.category === 'string'
                            ? row.category
                            : JSON.stringify(row.category)
                          : '—'}
                      </td>
                      <td className="hidden max-w-[240px] truncate px-4 py-3 text-neutral-500 md:table-cell">
                        {row.description ?? '—'}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-600 dark:text-neutral-300">
                        {formatDisplayDate(row.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            type="button"
                            className="size-8 p-0"
                            onClick={() => openEdit(row)}
                            disabled={row.id == null}
                            aria-label="编辑"
                          >
                            <Pencil className="size-4" strokeWidth={1.75} />
                          </Button>
                          <Button
                            variant="ghost"
                            type="button"
                            className="size-8 p-0 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                            onClick={() => row.id != null && handleDelete(row.id)}
                            disabled={row.id == null}
                            aria-label="删除"
                          >
                            <Trash2 className="size-4" strokeWidth={1.75} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          role="presentation"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <Card className="max-h-[90vh] w-full max-w-lg overflow-y-auto p-6 shadow-xl">
            <h2 className="mb-4 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {mode === 'create' ? '新建角色' : '编辑角色'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  编码 <span className="text-red-500">*</span>
                </label>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="如 actor、director"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  名称 <span className="text-red-500">*</span>
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="如 演员、导演"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  分类（JSON，可选）
                </label>
                <Textarea
                  value={categoryText}
                  onChange={(e) => setCategoryText(e.target.value)}
                  placeholder='JSON 字符串，例如 "cast"'
                  rows={2}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  说明
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {formError ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formError}
                </p>
              ) : null}
              <div className="mt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeModal}
                  disabled={saving}
                >
                  取消
                </Button>
                <Button type="submit" variant="primary" disabled={saving}>
                  {saving ? '保存中…' : '保存'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
