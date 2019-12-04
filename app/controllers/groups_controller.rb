class GroupsController < ApplicationController
  def index
    @group = Group.new
    @group.users << current_user
  end
  
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  private
  def group_params
    params.require(:group).permit(user_ids: [])
  end
end
